class DashboardController < ApplicationController

  def index
    mTT = TableTest.new

    @value = mTT.getTest()
    @yes = "Si"
  end
end
