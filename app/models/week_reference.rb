class WeekReference < ApplicationRecord
  self.table_name = "weekReference"

  def getId(date)
    return WeekReference.select(idWeek).where(startDate: date).take
    # return WeekReference.where(startDate: date).take
  end

end