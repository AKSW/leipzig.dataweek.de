require 'i18n'

#LOCALE = :lv # set your locale
LOCALE = :de # set your locale

# Create folder "_locales" and put some locale file from https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale
module Jekyll
  module I18nFilter
    # Example:
    #   {{ post.date | localize: "%d.%m.%Y" }}
    #   {{ post.date | localize: ":short" }}
    def localize(input, format=nil, language=nil)
      load_translations(language)
      format = (format =~ /^:(\w+)/) ? $1.to_sym : format
      if !input.is_a?(Date)
        input = Date.parse(input)
      end
      I18n.l input, :format => format
    rescue
      raise
      "error"
    end

    def load_translations(language=nil)
      if I18n.backend.send(:translations).empty?
        I18n.backend.load_translations Dir[File.join(File.dirname(__FILE__),'../_locales/*.yml')]
        if language
          I18n.locale = language
        else
          I18n.locale = LOCALE
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::I18nFilter)
