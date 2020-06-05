class DeliveryByWeek < ApplicationRecord
  self.table_name = "deliveryByWeek"
  self.primary_key = :idDeliveryByWeek
  has_many :vHistoricalOrdersByWeek

  def setDelivery(idWeek, idDeliveryMethod, quantity, avgCost, avgTime)
    row = DeliveryByWeek.new
    row.idWeek = idWeek
    row.idDeliveryMethod = idDeliveryMethod
    row.vehiclesQuantity = quantity
    row.costByDelivery = avgCost
    row.timeByDelivery = avgTime
    row.save

    return row.idDeliveryByWeek
  end

  def getDelivery(id_week_start, id_week_end)
    sql = "SELECT idDeliveryMethod, SUM(timeByDelivery) as time, COUNT(idWeek) as n_weeks
          from deliveryByWeek
          where idWeek between #{id_week_start} and #{id_week_end}
          group by idDeliveryMethod"

    ActiveRecord::Base.connection.exec_query(sql)
  end

end