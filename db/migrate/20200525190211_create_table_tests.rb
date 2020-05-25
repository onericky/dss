class CreateTableTests < ActiveRecord::Migration[6.0]
  def change
    create_table :table_tests do |t|

      t.timestamps
    end
  end
end
