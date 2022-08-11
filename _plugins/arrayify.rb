# Returns the supplied value in an array or an empty array

module Jekyll
  module Arrayify
    def arrayify(input)
      if input.nil?
        return Array.new()
      end
      return Array[input]
    end
  end
end

Liquid::Template.register_filter(Jekyll::Arrayify)
