class DashboardController < ApplicationController

  @simulation = Hash.new

  def index
    mTT = TableTest.new

    # @value = mTT.getTest()
    # mTT.insert
    @yes = "Si"
  end

  def ies

  end

  def documentation
    pdf_filename = File.join(Rails.root, "app/assets/pdf/sample.pdf")
    send_file(pdf_filename, :filename => "document.pdf", :disposition => 'inline', :type => "application/pdf")
  end

  def simulate
    case request.method_symbol
    when :post
        date = params[:date]
        @var_z = {:z1 => params[:z1], :z2 => params[:z2], :z3 => params[:z3]}
        @var_x = {:x1_bike => params[:x1_bike], :x1_moto => params[:x1_moto], :x1_car => params[:x1_car], :x2 => params[:x2]}
        @var_w = {:w1_bike => params[:w1_bike], :w1_moto => params[:w1_moto], :w1_car => params[:w1_car],
                  :w2_payroll => params[:w2_payroll], :w2_infrastructure => params[:w2_infrastructure], :w2_marketing => params[:w2_marketing],
                  :w3_a_quick => params[:w3_a_quick], :w3_b_quick => params[:w3_b_quick], :w3_c_quick => params[:w3_c_quick],
                  :w3_a_standard => params[:w3_a_standard], :w3_b_standard => params[:w3_b_standard], :w3_c_standard => params[:w3_c_standard],
                  :w4_bike => params[:w4_bike], :w4_moto => params[:w4_moto], :w4_car => params[:w4_car]}


        i = 0
        @max = getQuantityOrders(@var_w[:w3_a_quick].to_i, @var_w[:w3_b_quick].to_i, @var_w[:w3_c_quick].to_i, @var_w[:w3_a_standard].to_i, @var_w[:w3_b_standard].to_i, @var_w[:w3_c_standard].to_i)
        # @max = 120 + rand(31)
        # total de órdenes sumas todas w3

        base_time = 8
        base_cost = 20
        @variable_cost = @var_w[:w2_marketing].to_f
        @fixed_cost = @var_w[:w2_payroll].to_f + @var_w[:w2_infrastructure].to_f
        operating_expenses = @fixed_cost + @variable_cost

        mZone = Zone.new
        @zones = mZone.getZones()

        # @zones.each do |zn|
        #   @zn = zn.zoneName
        # end

        array_result =  Hash.new

        array_result_total =  Hash.new
        categories = ""

        @array_vehicle_cost =  Hash.new
        @array_vehicle_cost['bike'] = 0
        @array_vehicle_cost['moto'] = 0
        @array_vehicle_cost['car'] = 0

        # SIMULATION
        while i < @max  do
          vehicle = getVehicle
          @zone_and_order_type = getZoneAndOrderType

          order_type_cost = getOrderTypeCost(@zone_and_order_type[:orderType])
          vehicle_cost = getVehicleCost(vehicle)
          zone_cost = getZoneCost(@zone_and_order_type[:zone])
          risk_cost = getRiskCost(@var_z[:z1].to_i)
          weather_cost = getWeatherCost(@var_z[:z3])
          discount = 1 - (@var_x[:x2].to_f / 100)

          order_type_time = getOrderTypeTime(@zone_and_order_type[:orderType])
          vehicle_time = getVehicleTime('car')
          traffic = getTrafficTime(@var_z[:z2].to_i)
          zone_time = getZoneTime(@zone_and_order_type[:zone])

          pay = ((base_cost + (base_cost * order_type_cost) + (base_cost * zone_cost) + (base_cost * vehicle_cost) + risk_cost + weather_cost) * discount).round(2)
          time = (base_time + (base_time * order_type_time) + (base_time * traffic) + (base_time * zone_time) + (base_time * vehicle_time) + weather_cost).round(2)
          revenue = getRevenue(pay)

          array_result[i] = ['cost' => pay, 'time' => time, 'revenue' => revenue, 'vehicle' => vehicle, 'zone' => @zone_and_order_type[:zone], 'orderType' => @zone_and_order_type[:orderType]]
          setCostVehicle(vehicle, pay)

          i +=1
          categories += "order" + i.to_s + ","
        end

        # array_result_total = 0;

        data = ""
        times = ""

        array_result.each do |index, data_array|
          data_array.each do |row_array|
            row_array.each do |key, value|
              if(key == 'pay')
                data += value.to_s + ','
              else
                if(key == 'time')
                  times += value.to_s + ','
                end
              end
            end
          end
        end

        categories = categories.first(-1)
        data = data.first(-1)
        times = times.first(-1)

        id_week = getIdWeek(date)
        # guardar modelo con rollback

        # render "index", 'id_week': @id_week, 'date': @date
        render json: {'ok': true, 'arrayResult': array_result}
    end
  end

  def getIdWeek(date)
    m_week = WeekReference.new
    return m_week.getId(date)[:idWeek]
  end

  def getRevenue(cost)
    return cost * 0.65
  end

  def getVehicle
    rand_bike = rand_moto = rand_car = 0

    if(@var_x[:x1_bike] == 'true')
      rand_bike = 1 + rand(@var_w[:w4_bike].to_i)
    end

    if(@var_x[:x1_moto] == 'true')
      rand_moto = 1 + rand(@var_w[:w4_moto].to_i)
    end

    if(@var_x[:x1_car] == 'true')
      rand_car = 1 + rand(@var_w[:w4_car].to_i)
    end

    number = {'bike' => rand_bike,
              'moto' => rand_moto,
              'car' => rand_car}

    max = number.key(number.values.max)

    return max
  end

  def getZoneAndOrderType
    if(@var_w[:w3_a_quick].to_i > 0)
      @var_w[:w3_a_quick] = @var_w[:w3_a_quick].to_i - 1
      return {zone: 'A', orderType: 'quick'}
    end

    if(@var_w[:w3_a_standard].to_i > 0)
      @var_w[:w3_a_standard] = @var_w[:w3_a_standard].to_i - 1
      return {zone: 'A', orderType: 'standard'}
    end

    if(@var_w[:w3_b_quick].to_i > 0)
      @var_w[:w3_b_quick] = @var_w[:w3_b_quick].to_i - 1
      return {zone: 'B', orderType: 'quick'}
    end

    if(@var_w[:w3_b_standard].to_i > 0)
      @var_w[:w3_b_standard] = @var_w[:w3_b_standard].to_i - 1
      return {zone: 'B', orderType: 'standard'}
    end

    if(@var_w[:w3_c_quick].to_i > 0)
      @var_w[:w3_c_quick] = @var_w[:w3_c_quick].to_i - 1
      return {zone: 'C', orderType: 'quick'}
    end

    if(@var_w[:w3_c_standard].to_i > 0)
      @var_w[:w3_c_standard] = @var_w[:w3_c_standard].to_i - 1
      return {zone: 'C', orderType: 'standard'}
    end
  end

  def setCostVehicle(type, cost)
    case type
    when 'bike'
      @array_vehicle_cost['bike'] += cost
    when 'moto'
      @array_vehicle_cost['moto'] += cost
    when 'car'
      @array_vehicle_cost['car'] += cost
    end
  end

  def getQuantityOrders(w3_a_quick, w3_b_quick, w3_c_quick, w3_a_standard, w3_b_standard, w3_c_standard)
    return (w3_a_quick + w3_b_quick + w3_c_quick + w3_a_standard + w3_b_standard + w3_c_standard)
  end

  ##########################################    Costs    ##########################################
  def getRiskCost(z1)
    case z1
    when 1
      return 0
    when 2
      return 7
    when 3
      return 15
      else return 0
    end
  end

  def getWeatherCost(z3)
    if(z3 == 'true')
      return 3
    else
      return 10
    end
  end

  def getZoneCost(zone)
    case zone
    when 'A'
      return 0.12
    when 'B'
      return 0.15
    when 'C'
      return  0.35
    end
  end

  def getVehicleCost(vehicle)
    case vehicle
    when 'bike'
      return 0.15
    when 'moto'
      return 0.20
    when 'car'
      return 0.20
    end
  end

  def getOrderTypeCost(type)
    if(type == 'quick')
      return 0.10
    end

    return 0.25
  end

  ##########################################    Time    ##########################################
  def getTrafficTime(z2)
    case z2
    when 1
      return 0.1
    when 2
      return 0.7
    when 3
      return 1.2
    end
  end

  def getVehicleTime(vechile)
    case vechile
    when 'bike'
      return 0.7
    when 'moto'
      return 0.12
    when 'car'
      return 0.20
    end
  end

  def getOrderTypeTime(type)
    if(type == 'quick')
      return 0
    end

    return 0.7
  end

  def getZoneTime(zone)
    case zone
    when 'A'
      return 0.10
    when 'B'
      return 0.9
    when 'C'
      return  1.6
    end
  end

end
