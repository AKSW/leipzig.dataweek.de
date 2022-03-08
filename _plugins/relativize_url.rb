require 'pathname'

# Produces a path relative to the current page. For example, if the path
# `/images/me.jpg` is supplied, then the result could be, `me.jpg`,
# `images/me.jpg` or `../../images/me.jpg` depending on whether the current
# page lives in `/images`, `/` or `/sub/dir/` respectively.
#
# input - a path relative to the project root
#
# Returns the supplied path relativized to the current page.

module Jekyll
  module UrlRelativizer
    def relativize_url(input)
      return if input.nil?
      input = ensure_leading_slash(input)
      page_url = @context.registers[:page]["url"]
      if page_url.end_with?("/")
        page_dir = Pathname(page_url)
      else
        page_dir = Pathname(page_url).parent
      end
      Pathname(input).relative_path_from(page_dir).to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::UrlRelativizer)
