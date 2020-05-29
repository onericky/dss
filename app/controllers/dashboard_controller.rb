class DashboardController < ApplicationController

  def index
    params[:partNo]
    case request.method_symbol
      when :get
        @var = 'get';
      when :post
        @var = 'post'
        render json: {'ok': 'algo'}
      end


    mTT = TableTest.new

    # @value = mTT.getTest()
    @yes = "Si"
  end

  def ies

  end
end
