class DashboardController < ApplicationController

  def index
  end

  def eis
  end

  def about
  end

  def help
  end

  def documentation
    pdf_filename = File.join(Rails.root, "app/assets/pdf/sample.pdf")
    send_file(pdf_filename, :filename => "document.pdf", :disposition => 'inline', :type => "application/pdf")
  end

  def eis_post
    case request.method_symbol
    when :post
      date = params[:date]

      id_week = getIdWeek(date)

      if id_week != ""
        m_historical = VHistoricalOrdersByWeek.new
        historical = m_historical.getHistoricalByWeek(id_week)

        m_expenses_week = ExpenseByWeek.new
        expenses = m_expenses_week.getExpenses(id_week)

        m_delivery_week = DeliveryByWeek.new
        delivery = m_delivery_week.getDelivery(id_week)

        revenue = m_historical.getRevenues(id_week)
        orders_zones = m_historical.getOrdersByZone(id_week)

        result = true
        if historical.empty? || expenses.empty? || delivery.empty? || orders_zones.empty?
          result = false
        end

        array_result = ['historical' => historical, 'expenses' => expenses, 'delivery' => delivery, 'revenue' => revenue, 'orders_zones' => orders_zones]

        render json: {'result': result, 'date': date, 'idWeek': id_week, 'arrayResult': array_result}
      else
        render json: {'result': false}
      end
    end
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

      id_week = getIdWeek(date)
      if validateDate(id_week)
        i = 0
        @max = getQuantityOrders(@var_w[:w3_a_quick].to_i, @var_w[:w3_b_quick].to_i, @var_w[:w3_c_quick].to_i, @var_w[:w3_a_standard].to_i, @var_w[:w3_b_standard].to_i, @var_w[:w3_c_standard].to_i)

        base_time = 8
        base_cost = 20
        variable_cost = @var_w[:w2_marketing].to_f
        fixed_cost = @var_w[:w2_payroll].to_f + @var_w[:w2_infrastructure].to_f
        operating_expenses = (fixed_cost + variable_cost).round(2)
        total_sum_revenue = 0

        mZone = Zone.new
        @zones = mZone.getZones()

        array_result = Hash.new
        categories = ""

        @array_vehicle_cost_bike = Hash.new
        @array_vehicle_cost_moto = Hash.new
        @array_vehicle_cost_car = Hash.new

        @array_vehicle_cost_bike['cost'] = 0
        @array_vehicle_cost_bike['cost_total'] = 0
        @array_vehicle_cost_bike['time'] = 0
        @array_vehicle_cost_bike['count'] = 0
        @array_vehicle_cost_bike['count_a'] = 0
        @array_vehicle_cost_bike['count_b'] = 0
        @array_vehicle_cost_bike['count_c'] = 0

        @array_vehicle_cost_moto['cost'] = 0
        @array_vehicle_cost_moto['cost_total'] = 0
        @array_vehicle_cost_moto['time'] = 0
        @array_vehicle_cost_moto['count'] = 0
        @array_vehicle_cost_moto['count_a'] = 0
        @array_vehicle_cost_moto['count_b'] = 0
        @array_vehicle_cost_moto['count_c'] = 0

        @array_vehicle_cost_car['cost'] = 0
        @array_vehicle_cost_car['cost_total'] = 0
        @array_vehicle_cost_car['time'] = 0
        @array_vehicle_cost_car['count'] = 0
        @array_vehicle_cost_car['count_a'] = 0
        @array_vehicle_cost_car['count_b'] = 0
        @array_vehicle_cost_car['count_c'] = 0

        # SIMULATION
        while i < @max  do
          vehicle = getVehicle
          base_cost = getVehicleDeliveryCost(vehicle)
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

          pay = ((base_cost + (base_cost * order_type_cost) + (base_cost * zone_cost) + (base_cost * vehicle_cost) + risk_cost + weather_cost)).round(2)
          cost_normal = pay
          pay = (pay * discount).round(2)

          time = (base_time + (base_time * order_type_time) + (base_time * traffic) + (base_time * zone_time) + (base_time * vehicle_time) + weather_cost).round(2)

          # save in array
          setCostTimeVehicle(vehicle, cost_normal, pay, time, @zone_and_order_type[:zone])

          revenue = getRevenue(pay)
          total_sum_revenue += revenue

          array_result[i] = ['cost_normal' => cost_normal, 'cost_after_discount' => pay, 'time' => time, 'revenue' => revenue, 'vehicle' => vehicle, 'zone' => @zone_and_order_type[:zone], 'orderType' => @zone_and_order_type[:orderType]]

          i +=1
          categories += "order" + i.to_s + ","
        end

        total_revenue = total_sum_revenue.round(2)

        # save to DB
        saveExpensesByWeek(id_week)
        saveDeliveryByWeek(id_week)
        saveHistorical(id_week)

        # render "index", 'id_week': @id_week, 'date': @date
        render json: {'result': true, 'arrayResult': array_result, 'operating_expenses': operating_expenses, 'total_revenue': total_revenue}
      else
        render json: {'result': false, 'id_week': id_week}
      end
    end
  end

  def validateDate(id_week)
    m_expenses_week = ExpenseByWeek.new
    record_expenses = m_expenses_week.getExpenses(id_week)

    m_delivery_week = DeliveryByWeek.new
    record_delivery = m_delivery_week.getDelivery(id_week)

    m_historical = VHistoricalOrdersByWeek.new
    record_historical = m_historical.getHistoricalByWeek(id_week)

    if record_expenses.empty? && record_delivery.empty? && record_historical.empty?
      return true
    end

    return false
  end

  def saveExpensesByWeek(id_week)
    m_expenses_week = ExpenseByWeek.new
    m_expenses_week.setExpenses(id_week, @var_w[:w2_payroll].to_f, @var_w[:w2_infrastructure].to_f, @var_w[:w2_marketing].to_f)
  end

  def saveDeliveryByWeek(id_week)
    m_delivery_week = DeliveryByWeek.new
    if @array_vehicle_cost_bike['count'] <= 0
      avg_cost = 0
      avg_time = 0
    else
      avg_cost = (@array_vehicle_cost_bike['cost_total'] / @array_vehicle_cost_bike['count']).round(2)
      avg_time = (@array_vehicle_cost_bike['time'] / @array_vehicle_cost_bike['count']).round(2)
    end
    @id_delivery_week_bike = m_delivery_week.setDelivery(id_week, 1, @array_vehicle_cost_bike['count'], avg_cost, avg_time)

    m_delivery_week = DeliveryByWeek.new
    if @array_vehicle_cost_moto['count'] <= 0
      avg_cost = 0
      avg_time = 0
    else
      avg_cost = (@array_vehicle_cost_moto['cost_total'] / @array_vehicle_cost_moto['count']).round(2)
      avg_time = (@array_vehicle_cost_moto['time'] / @array_vehicle_cost_moto['count']).round(2)
    end
    @id_delivery_week_moto = m_delivery_week.setDelivery(id_week, 2, @array_vehicle_cost_moto['count'], avg_cost, avg_time)

    m_delivery_week = DeliveryByWeek.new
    if @array_vehicle_cost_car['count'] <= 0
      avg_cost = 0
      avg_time = 0
    else
      avg_cost = (@array_vehicle_cost_car['cost_total'] / @array_vehicle_cost_car['count']).round(2)
      avg_time = (@array_vehicle_cost_car['time'] / @array_vehicle_cost_car['count']).round(2)
    end
    @id_delivery_week_car = m_delivery_week.setDelivery(id_week, 3, @array_vehicle_cost_car['count'], avg_cost, avg_time)
  end

  def saveHistorical(id_week)
    id_weather = getIdWeather
    expenses = (@var_w[:w2_payroll].to_f + @var_w[:w2_infrastructure].to_f + @var_w[:w2_marketing].to_f).round(2)
    @array_vehicle_cost_bike['cost'] = @array_vehicle_cost_bike['cost'].round(2)
    @array_vehicle_cost_bike['cost_total'] = @array_vehicle_cost_bike['cost_total'].round(2)
    @array_vehicle_cost_moto['cost'] = @array_vehicle_cost_moto['cost'].round(2)
    @array_vehicle_cost_moto['cost_total'] = @array_vehicle_cost_moto['cost_total'].round(2)
    @array_vehicle_cost_car['cost'] = @array_vehicle_cost_car['cost'].round(2)
    @array_vehicle_cost_car['cost_total'] = @array_vehicle_cost_car['cost_total'].round(2)

    m_historical = VHistoricalOrdersByWeek.new

    m_historical.setHistorical(id_week, 1, 1, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_bike, expenses, @var_x[:x2].to_f, @array_vehicle_cost_bike['count_a'], @array_vehicle_cost_bike['cost'], @array_vehicle_cost_bike['cost_total'])
    m_historical.setHistorical(id_week, 1, 2, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_bike, expenses, @var_x[:x2].to_f, @array_vehicle_cost_bike['count_b'], @array_vehicle_cost_bike['cost'], @array_vehicle_cost_bike['cost_total'])
    m_historical.setHistorical(id_week, 1, 3, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_bike, expenses, @var_x[:x2].to_f, @array_vehicle_cost_bike['count_c'], @array_vehicle_cost_bike['cost'], @array_vehicle_cost_bike['cost_total'])
    m_historical.setHistorical(id_week, 2, 1, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_bike, expenses, @var_x[:x2].to_f, @array_vehicle_cost_bike['count_a'], @array_vehicle_cost_bike['cost'], @array_vehicle_cost_bike['cost_total'])
    m_historical.setHistorical(id_week, 2, 2, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_bike, expenses, @var_x[:x2].to_f, @array_vehicle_cost_bike['count_b'], @array_vehicle_cost_bike['cost'], @array_vehicle_cost_bike['cost_total'])
    m_historical.setHistorical(id_week, 2, 3, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_bike, expenses, @var_x[:x2].to_f, @array_vehicle_cost_bike['count_c'], @array_vehicle_cost_bike['cost'], @array_vehicle_cost_bike['cost_total'])

    m_historical.setHistorical(id_week, 1, 1, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_moto, expenses, @var_x[:x2].to_f, @array_vehicle_cost_moto['count_a'], @array_vehicle_cost_moto['cost'], @array_vehicle_cost_moto['cost_total'])
    m_historical.setHistorical(id_week, 1, 2, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_moto, expenses, @var_x[:x2].to_f, @array_vehicle_cost_moto['count_b'], @array_vehicle_cost_moto['cost'], @array_vehicle_cost_moto['cost_total'])
    m_historical.setHistorical(id_week, 1, 3, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_moto, expenses, @var_x[:x2].to_f, @array_vehicle_cost_moto['count_c'], @array_vehicle_cost_moto['cost'], @array_vehicle_cost_moto['cost_total'])
    m_historical.setHistorical(id_week, 2, 1, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_moto, expenses, @var_x[:x2].to_f, @array_vehicle_cost_moto['count_a'], @array_vehicle_cost_moto['cost'], @array_vehicle_cost_moto['cost_total'])
    m_historical.setHistorical(id_week, 2, 2, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_moto, expenses, @var_x[:x2].to_f, @array_vehicle_cost_moto['count_b'], @array_vehicle_cost_moto['cost'], @array_vehicle_cost_moto['cost_total'])
    m_historical.setHistorical(id_week, 2, 3, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_moto, expenses, @var_x[:x2].to_f, @array_vehicle_cost_moto['count_c'], @array_vehicle_cost_moto['cost'], @array_vehicle_cost_moto['cost_total'])

    m_historical.setHistorical(id_week, 1, 1, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_car, expenses, @var_x[:x2].to_f, @array_vehicle_cost_car['count_a'], @array_vehicle_cost_car['cost'], @array_vehicle_cost_car['cost_total'])
    m_historical.setHistorical(id_week, 1, 2, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_car, expenses, @var_x[:x2].to_f, @array_vehicle_cost_car['count_b'], @array_vehicle_cost_car['cost'], @array_vehicle_cost_car['cost_total'])
    m_historical.setHistorical(id_week, 1, 3, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_car, expenses, @var_x[:x2].to_f, @array_vehicle_cost_car['count_c'], @array_vehicle_cost_car['cost'], @array_vehicle_cost_car['cost_total'])
    m_historical.setHistorical(id_week, 2, 1, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_car, expenses, @var_x[:x2].to_f, @array_vehicle_cost_car['count_a'], @array_vehicle_cost_car['cost'], @array_vehicle_cost_car['cost_total'])
    m_historical.setHistorical(id_week, 2, 2, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_car, expenses, @var_x[:x2].to_f, @array_vehicle_cost_car['count_b'], @array_vehicle_cost_car['cost'], @array_vehicle_cost_car['cost_total'])
    m_historical.setHistorical(id_week, 2, 3, @var_z[:z1].to_i, @var_z[:z2].to_i, id_weather, @id_delivery_week_car, expenses, @var_x[:x2].to_f, @array_vehicle_cost_car['count_c'], @array_vehicle_cost_car['cost'], @array_vehicle_cost_car['cost_total'])
  end

  def getIdWeek(date)
    m_week = WeekReference.new
    result = m_week.getId(date)

    if(result)
      return result[:idWeek]
    end

    return ""
  end

  def getRevenue(cost)
    return cost * 0.65
  end

  def getVehicle
    rand_bike = rand_moto = rand_car = 0

    if @var_x[:x1_bike] == 'true'
      rand_bike = 1 + rand(@var_w[:w4_bike].to_i)
    end

    if @var_x[:x1_moto] == 'true'
      rand_moto = 1 + rand(@var_w[:w4_moto].to_i)
    end

    if @var_x[:x1_car] == 'true'
      rand_car = 1 + rand(@var_w[:w4_car].to_i)
    end

    number = {'bike' => rand_bike,
              'moto' => rand_moto,
              'car' => rand_car}

    max = number.key(number.values.max)

    return max
  end

  def getVehicleDeliveryCost(vehicle)
    case vehicle
    when 'bike'
      return @var_w[:w1_bike].to_f
    when 'moto'
      return @var_w[:w1_moto].to_f
    when 'car'
      return @var_w[:w1_car].to_f
    end
  end

  def getZoneAndOrderType
    if @var_w[:w3_a_quick].to_i > 0
      @var_w[:w3_a_quick] = @var_w[:w3_a_quick].to_i - 1
      return {zone: 'A', orderType: 'quick'}
    end

    if @var_w[:w3_a_standard].to_i > 0
      @var_w[:w3_a_standard] = @var_w[:w3_a_standard].to_i - 1
      return {zone: 'A', orderType: 'standard'}
    end

    if @var_w[:w3_b_quick].to_i > 0
      @var_w[:w3_b_quick] = @var_w[:w3_b_quick].to_i - 1
      return {zone: 'B', orderType: 'quick'}
    end

    if(@var_w[:w3_b_standard].to_i > 0)
      @var_w[:w3_b_standard] = @var_w[:w3_b_standard].to_i - 1
      return {zone: 'B', orderType: 'standard'}
    end

    if @var_w[:w3_c_quick].to_i > 0
      @var_w[:w3_c_quick] = @var_w[:w3_c_quick].to_i - 1
      return {zone: 'C', orderType: 'quick'}
    end

    if @var_w[:w3_c_standard].to_i > 0
      @var_w[:w3_c_standard] = @var_w[:w3_c_standard].to_i - 1
      return {zone: 'C', orderType: 'standard'}
    end
  end

  def setCostTimeVehicle(type, cost_normal, cost_total, time, zone)
    case type
    when 'bike'
      @array_vehicle_cost_bike['cost'] += cost_normal
      @array_vehicle_cost_bike['cost_total'] += cost_total
      @array_vehicle_cost_bike['time'] += time
      @array_vehicle_cost_bike['count'] += 1
      if zone == 'A'
        @array_vehicle_cost_bike['count_a'] += 1
      end

      if zone == 'B'
        @array_vehicle_cost_bike['count_b'] += 1
      end

      if zone == 'C'
        @array_vehicle_cost_bike['count_c'] += 1
      end
    when 'moto'
      @array_vehicle_cost_moto['cost'] += cost_normal
      @array_vehicle_cost_moto['cost_total'] += cost_total
      @array_vehicle_cost_moto['time'] += time
      @array_vehicle_cost_moto['count'] += 1
      if zone == 'A'
        @array_vehicle_cost_moto['count_a'] += 1
      end

      if zone == 'B'
        @array_vehicle_cost_moto['count_b'] += 1
      end

      if zone == 'C'
        @array_vehicle_cost_moto['count_c'] += 1
      end
    when 'car'
      @array_vehicle_cost_car['cost'] += cost_normal
      @array_vehicle_cost_car['cost_total'] += cost_total
      @array_vehicle_cost_car['time'] += time
      @array_vehicle_cost_car['count'] += 1
      if zone == 'A'
        @array_vehicle_cost_car['count_a'] += 1
      end

      if zone == 'B'
        @array_vehicle_cost_car['count_b'] += 1
      end

      if zone == 'C'
        @array_vehicle_cost_car['count_c'] += 1
      end
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
      return 0.10
    when 'moto'
      return 0.15
    when 'car'
      return 0.25
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

  def getIdWeather
    if(@var_z[:z3] == 'true')
      return 1
    else
      return 2
    end
  end

end
