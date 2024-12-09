class CreateFoodNotes < ActiveRecord::Migration[8.0]
  def change
    create_table :food_notes do |t|
      t.string :food
      t.text :note

      t.timestamps
    end
  end
end
