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

  def getRevenues(id_week_start, id_week_end)
    sql = "SELECT
          vHistoricalOrdersByWeek.idDeliveryByWeek,
          deliveryByWeek.idDeliveryMethod,
          vHistoricalOrdersByWeek.totalOrderAfterDiscount as total_sales,
          (vHistoricalOrdersByWeek.totalOrderAfterDiscount * 0.65) as total_revenue,
          CASE WHEN deliveryByWeek.idDeliveryMethod = 1 THEN (deliveryByWeek.costByDelivery * 0.65) END as total_revenue_bike,
          CASE WHEN deliveryByWeek.idDeliveryMethod = 2 THEN (deliveryByWeek.costByDelivery * 0.65) END as total_revenue_moto,
          CASE WHEN deliveryByWeek.idDeliveryMethod = 3 THEN (deliveryByWeek.costByDelivery * 0.65) END as total_revenue_car
          from vHistoricalOrdersByWeek
          join deliveryByWeek on deliveryByWeek.idDeliveryByWeek = vHistoricalOrdersByWeek.idDeliveryByWeek
          where vHistoricalOrdersByWeek.idWeek between #{id_week_start} and #{id_week_end} AND idOrderType = 1
          group by deliveryByWeek.idDeliveryMethod, vHistoricalOrdersByWeek.idDeliveryByWeek, vHistoricalOrdersByWeek.totalOrderAfterDiscount, deliveryByWeek.costByDelivery"

    ActiveRecord::Base.connection.exec_query(sql)
  end

  def getOrdersByZone(id_week_start, id_week_end)
    sql = "SELECT vHistoricalOrdersByWeek.idZone, deliveryByWeek.idDeliveryMethod,
          SUM(vHistoricalOrdersByWeek.quantityOfOrders) as total_by_zone,
          SUM(CASE WHEN vHistoricalOrdersByWeek.discountPercentaje = 0 THEN vHistoricalOrdersByWeek.quantityOfOrders END) as total_by_zone_without,
          SUM(CASE WHEN vHistoricalOrdersByWeek.discountPercentaje > 0 THEN vHistoricalOrdersByWeek.quantityOfOrders END) as total_by_zone_with,
          vHistoricalOrdersByWeek.discountPercentaje
          from vHistoricalOrdersByWeek
          join deliveryByWeek on deliveryByWeek.idDeliveryByWeek = vHistoricalOrdersByWeek.idDeliveryByWeek
          where vHistoricalOrdersByWeek.idWeek between #{id_week_start} and #{id_week_end} AND idOrderType = 1
          group by deliveryByWeek.idDeliveryMethod, vHistoricalOrdersByWeek.idZone, vHistoricalOrdersByWeek.discountPercentaje"

    ActiveRecord::Base.connection.exec_query(sql)
  end

end