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

        fixed = 25
        @variable_cost = @var_w[:w2_marketing].to_f
        @fixed_cost = @var_w[:w2_payroll].to_f + @var_w[:w2_infrastructure].to_f
        operating_expenses = @fixed_cost + @variable_cost

        mZone = Zone.new
        @zones = mZone.getZones()

        # @zones.each do |zn|
        #   @zn = zn.zoneName
        # end

        @pay = Hash.new
        @data2 = Hash.new
        @categories = ""

        while i < @max  do
          type_per = getOrderType
          vehi_per = getVehicle(@var_w[:w4_bike].to_i, @var_w[:w4_moto].to_i, @var_w[:w4_car].to_i)
          zone_per = getZone
          risk_cost = getRisk(@var_z[:z1].to_i)
          weather = getWeather(@var_z[:z3])
          # multiplicar descuento
          #

          # no afecta en costo solo en tiempo
          traffic = getTraffic(@var_z[:z2].to_i)

          pay = fixed + (fixed * type_per) + (fixed * zone_per) + (fixed * vehi_per) + risk_cost + weather
          # guardar pay
          @pay[i] = ['pay' => pay]
          @data2[i] = pay

          i +=1
          @categories += "'order" + i.to_s + "', "
        end

        @data = ""
        @categories = @categories.first(-2)
        @data2.each do |k, v|
          @data += v.to_s + ', '
        end

        # guardar modelo con rollback

        # render "index", max: @max, pay: @pay, categories: @categories, data: @data
        # render :json => "alert('Hello Rails');", return => {'ok': 'algo'}
        render json: {'ok': 'algo', 'data': @data, 'categories': @categories}
    end
  end

  def wformula

  end

  def getQuantityOrders(w3_a_quick, w3_b_quick, w3_c_quick, w3_a_standard, w3_b_standard, w3_c_standard)
    return (w3_a_quick + w3_b_quick + w3_c_quick + w3_a_standard + w3_b_standard + w3_c_standard)
  end

  def getRisk(z1)
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

  def getTraffic(z2)
    case z2
    when 1
      return 0
    when 2
      return 7
    when 3
      return 15
    else return 0
    end
  end

  def getWeather(z3)
    if(z3 == 'true')
      return 3
    else
      return 10
    end
  end

  def getZone
    random_zone = 1 + rand(3)
    case random_zone
    when 1
      return 0.12
    when 2
      return 0.15
    when 3
      return  0.35
    end
  end

  def getVehicle(nBikes, nMotorbikes, nCars)
    number = {'bike' => (1 + rand(nBikes)),
              'moto' => (1 + rand(nMotorbikes)),
              'car' => (1 + rand(nCars))}

    max = number.key(number.values.max)

    case max
    when 'bike'
      return 0.15
    when 'moto'
      return 0.20
    when 'car'
      return 0.20
    end
  end

  def getOrderType
    random_ot = 1 + rand(2)
    case random_ot
    when 1
      return 0.10
    when 2
      return 0.25
    end
  end

end
