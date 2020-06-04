require 'erb'

module Nyaplot

  @@dep_libraries = {
    d3:'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min',
    downloadable: 'http://cdn.rawgit.com/domitry/d3-downloadable/master/d3-downloadable'
  }
  @@additional_libraries = {}
  @@extension_lists = []

  def self.extension_lists
    @@extension_lists
  end

  # Tell JavaScript back-end library to load some extension libraries
  # @param [String] name The name of JavaScript extension library to load
  def self.add_extension(name)
    @@extension_lists.push(name)
  end

  # Load extension library to IRuby notebook after Nyaplotjs is loaded
  def self.add_dependency(name, url)
    @@dep_libraries[name]=url;
  end

  # Load extension library to IRuby notebook before Nyaplotjs is loaded
  def self.add_additional_library(name, url)
    @@additional_libraries[name]=url
  end

  # generate initializing code
  def self.generate_init_code
    path = File.expand_path("../templates/init.js.erb", __FILE__)
    template = File.read(path)
    dep_libraries = @@dep_libraries
    additional_libraries = @@additional_libraries
    js = ERB.new(template).result(binding)
    js
  end

  # Enable to show plots on IRuby notebook
  def self.init_iruby
    js = self.generate_init_code
    IRuby.display(IRuby.javascript(js))
  end

  init_iruby if defined? IRuby
end
