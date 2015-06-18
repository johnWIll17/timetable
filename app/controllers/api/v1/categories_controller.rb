module Api
  module V1
    class CategoriesController < Api::V1::ApiBaseController
      def initialize
        super
        @model = Category
      end

      def subjects_category
        respond_with @model.find(params[:id]).subjects
      end
    end
  end
end
