class AddDescriptionIntoSubject < ActiveRecord::Migration
  def change
    add_column :subjects, :description, :text
  end
end
