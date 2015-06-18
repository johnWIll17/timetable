module Api
  module V1
    class ApiBaseController < ApplicationController
      respond_to :json

      def initialize
        super
        @model = nil
      end

      def index
        respond_with @model.all if @model
      end

      def show
        respond_with @model.find(params[:id]) if @model
      end

    end
  end
end
