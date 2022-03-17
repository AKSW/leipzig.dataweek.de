Jekyll::Hooks.register :site, :after_init do |site|
  if ENV.has_key?("JEKYLL_LANGUAGE")
    site.config["language"] = ENV["JEKYLL_LANGUAGE"]
    puts "overwrite the site.language with: " + site.config["language"]
  end
end
