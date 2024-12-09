class FoodNotesController < ApplicationController

    # GET food_notes
    def index
      @food_notes = FoodNote.all
      render json: @food_notes
    end
  
    # Create food_notes
    def create
      @food_note = FoodNote.new(food_note_params)
  
      if @food_note.save
        render json: @food_note, status: :created
      else
        render json: @food_note.errors, status: :unprocessable_entity
      end
    end
  
    # Edit food_notes
    def update
      @food_note = FoodNote.find(params[:id])
  
      if @food_note.update(food_note_params)
        render json: @food_note
      else
        render json: @food_note.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE food_notes
    def destroy
      @food_note = FoodNote.find(params[:id])
      @food_note.destroy
      head :no_content
    end
  
    private
  
    def food_note_params
      params.require(:food_note).permit(:food, :note)
    end
  end
  