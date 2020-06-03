class VHistoricalOrdersByWeek < ApplicationRecord
  self.table_name = "vHistoricalOrdersByWeek"

  def setHistorical(idWeek, idOrderType, idZone, idRisk, idTraffic, idWeatherSeason, idDeliveryByWeek, totalExpensebyWeek, discountPercentaje, quantityOfOrders, totalOrder, totalOrderAfterDiscount)
    row = VHistoricalOrdersByWeek.new
    row.idWeek = idWeek
    row.idOrderType = idOrderType
    row.idZone = idZone
    row.idRisk = idRisk
    row.idTraffic = idTraffic
    row.idWeatherSeason = idWeatherSeason
    row.idDeliveryByWeek = idDeliveryByWeek
    row.totalExpensebyWeek = totalExpensebyWeek
    row.discountPercentaje = discountPercentaje
    row.quantityOfOrders = quantityOfOrders
    row.totalOrder = totalOrder
    row.totalOrderAfterDiscount = totalOrderAfterDiscount
    row.save
  end



end