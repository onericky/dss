class Zone < ApplicationRecord
  self.table_name = "zone"

  def getZones()
    return Zone.select(idZone, zoneName)
    # Client.where(first_name: 'Lifo').take
  end

end