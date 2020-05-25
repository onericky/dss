class TableTest < ApplicationRecord
  self.table_name = "tableTest"

  def getTest()
    return TableTest.take(1)
    # Client.where(first_name: 'Lifo').take
  end

end
