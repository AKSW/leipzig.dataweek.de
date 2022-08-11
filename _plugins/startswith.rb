# Returns the supplied value in an array or an empty array

module Jekyll
  module StartsWith
    def startswith(text, query)
      return text.start_with? query
    end
  end
end

Liquid::Template.register_filter(Jekyll::StartsWith)
