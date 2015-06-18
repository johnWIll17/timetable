class AddCreditAndStaffToSubject < ActiveRecord::Migration
  def change
    add_column :subjects, :credit, :integer
    add_column :subjects, :staff, :string
  end
end
