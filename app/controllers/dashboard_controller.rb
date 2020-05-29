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
        @max = [rand(110), rand(150)]

        fixed = 20
        variable_cost = 10

        # fixed_cost = @var_w[:w2_payroll] + @var_w[:w2_infrastructure]
        # operating_expenses = fixed_cost + variable_cost

        # modificar
        type_per = 0.1
        zone_per = 0.15
        vehi_per = 0.2
        risk_cost = 7
        weather = 3

        # while i < max  do
        #   pay = fixed + (fixed * type_per) + (fixed * zone_per) + (fixed * vehi_per) + risk_cost + weather
        #   # guardar pay
        #   i +=1
        # end
        # @z3 = @var_z[:z3]
        render "ies", var_z: @var_z, max: @max
        # render json: {'ok': 'algo'}
    end
  end

  private

  def wformula

  end

end
