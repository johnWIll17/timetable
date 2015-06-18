module Api
  module V1
    class SubjectsController < Api::V1::ApiBaseController
      def initialize
        super
        @model = Subject
      end
    end
  end
end

