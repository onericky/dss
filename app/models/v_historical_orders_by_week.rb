class VHistoricalOrdersByWeek < ApplicationRecord
  self.table_name = "vHistoricalOrdersByWeek"
  belongs_to :deliveryByWeek, foreign_key: :idDeliveryByWeek

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

  def getHistoricalByWeek(idWeek)
    VHistoricalOrdersByWeek.where(idWeek: idWeek)
  end

  def getRevenues(idWeek)
    VHistoricalOrdersByWeek
        .select('vHistoricalOrdersByWeek.idDeliveryByWeek',
                'vHistoricalOrdersByWeek.totalOrderAfterDiscount as total_sales',
                'deliveryByWeek.idDeliveryMethod',
                '(vHistoricalOrdersByWeek.totalOrderAfterDiscount * 0.65) as total_revenue',
                'CASE WHEN deliveryByWeek.idDeliveryMethod = 1 THEN ROUND((deliveryByWeek.costByDelivery * 0.65), 2) END as total_revenue_bike',
                'CASE WHEN deliveryByWeek.idDeliveryMethod = 2 THEN ROUND((deliveryByWeek.costByDelivery * 0.65), 2) END as total_revenue_moto',
                'CASE WHEN deliveryByWeek.idDeliveryMethod = 3 THEN ROUND((deliveryByWeek.costByDelivery * 0.65), 2) END as total_revenue_car')
        .joins(:deliveryByWeek)
        .where(idWeek: idWeek)
  end

  def getOrdersByZone(idWeek)
    VHistoricalOrdersByWeek
        .select('vHistoricalOrdersByWeek.idZone',
                'deliveryByWeek.idDeliveryMethod',
                'CASE WHEN vHistoricalOrdersByWeek.idZone = 1 THEN vHistoricalOrdersByWeek.quantityOfOrders END as a_orders',
                'CASE WHEN vHistoricalOrdersByWeek.idZone = 2 THEN vHistoricalOrdersByWeek.quantityOfOrders END as b_orders',
                'CASE WHEN vHistoricalOrdersByWeek.idZone = 3 THEN vHistoricalOrdersByWeek.quantityOfOrders END as c_orders')
        .joins(:deliveryByWeek)
        .where(idWeek: idWeek)
  end

end