class DashboardController < ApplicationController

  def index
    mTT = TableTest.new

    # @value = mTT.getTest()
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
        @max = 120 + rand(31)

        fixed = 25
        @variable_cost = @var_w[:w2_marketing].to_f
        @fixed_cost = @var_w[:w2_payroll].to_f + @var_w[:w2_infrastructure].to_f
        operating_expenses = @fixed_cost + @variable_cost

        mZone = Zone.new
        @zones = mZone.getZones()

        # @zones.each do |zn|
        #   @zn = zn.zoneName
        # end

        # Tomar tipo de orden quick o standard


        # modificar
        type_per = 0.1
        zone_per = 0.15
        vehi_per = 0.2


        @pay = Hash.new

        while i < @max  do
          # order type
          if(true)
            # 10% quick
            # 25% standar
            type_per = 0.10
          end

          # zone
          if(true)

            # 12% zona A
            # 15% Zona B
            # 35% Zona C
            # zone_per = 0.15
            zone_per = getZone
          end

          # vehiculo
          if(true)
            # 15% bici
            # 20% moto
            # 30% carro
            vehi_per = 0.20
          end

          risk_cost = getRisk(@var_z[:z1])
          traffic = getTraffic(@var_z[:z2])
          weather = getWeather(@var_z[:z3])

          pay = fixed + (fixed * type_per) + (fixed * zone_per) + (fixed * vehi_per) + risk_cost + traffic + weather
          # guardar pay
          @pay[i] = ['pay' => pay]

          i +=1
        end


        @varz1 = @var_z[:z1]
        @z3 = @var_z[:z3]
        render "ies", max: @max, pay: @pay
        # render json: {'ok': 'algo'}
    end
  end

  def wformula

  end

  def getRisk(z1)
    case z1
    when '1'
      return 0
    when '2'
      return 7
    when '3'
      return 15
      else return 0
    end
  end

  def getTraffic(z2)
    case z2
    when '1'
      return 0
    when '2'
      return 7
    when '3'
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

end
