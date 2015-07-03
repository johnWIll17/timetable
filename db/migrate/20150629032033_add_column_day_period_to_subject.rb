class AddColumnDayPeriodToSubject < ActiveRecord::Migration
  def change
      add_column :subjects, :day, :string
      add_column :subjects, :period, :integer
  end
end
