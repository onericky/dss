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

  def getDelivery(idWeek)
    DeliveryByWeek.where(idWeek: idWeek)
  end

end