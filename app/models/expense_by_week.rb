class ExpenseByWeek < ApplicationRecord
  self.table_name = "expenseByWeek"

  def setExpenses(idWeek, payroll, infrastructure, marketing)
    row = ExpenseByWeek.new
    row.idWeek = idWeek
    row.idExpenseType = 1
    row.cost = payroll
    row.save

    row = ExpenseByWeek.new
    row.idWeek = idWeek
    row.idExpenseType = 2
    row.cost = infrastructure
    row.save

    row = ExpenseByWeek.new
    row.idWeek = idWeek
    row.idExpenseType = 3
    row.cost = marketing
    row.save
  end

  def getExpenses(idWeek)
    ExpenseByWeek.where(idWeek: idWeek)
  end

  def getTotalExpenses(id_week_start, id_week_end)
    sql = "SELECT SUM(cost) as total_expenses
          from expenseByWeek
          where idWeek between #{id_week_start} and #{id_week_end}"

    ActiveRecord::Base.connection.exec_query(sql)
  end

end