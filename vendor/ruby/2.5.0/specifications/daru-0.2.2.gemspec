# -*- encoding: utf-8 -*-
# stub: daru 0.2.2 ruby lib

Gem::Specification.new do |s|
  s.name = "daru".freeze
  s.version = "0.2.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sameer Deshmukh".freeze]
  s.date = "2019-08-11"
  s.description = "Daru (Data Analysis in RUby) is a library for analysis, manipulation and visualization\nof data. Daru works seamlessly accross interpreters and leverages interpreter-specific\noptimizations whenever they are available.\n\nIt is the default data storage gem for all the statsample gems (glm, timeseries, etc.)\nand can be used with many others like mixed_models, gnuplotrb, nyaplot and iruby.\n".freeze
  s.email = ["sameer.deshmukh93@gmail.com".freeze]
  s.homepage = "http://github.com/v0dro/daru".freeze
  s.licenses = ["BSD-2".freeze]
  s.rubygems_version = "2.7.6".freeze
  s.summary = "Data Analysis in RUby".freeze

  s.installed_by_version = "2.7.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<backports>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<packable>.freeze, ["~> 1.3.9"])
      s.add_development_dependency(%q<spreadsheet>.freeze, ["~> 1.1.1"])
      s.add_development_dependency(%q<bundler>.freeze, [">= 1.10"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.5"])
      s.add_development_dependency(%q<pry>.freeze, ["~> 0.10"])
      s.add_development_dependency(%q<pry-byebug>.freeze, [">= 0"])
      s.add_development_dependency(%q<rserve-client>.freeze, ["~> 0.3"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.4"])
      s.add_development_dependency(%q<rspec-its>.freeze, [">= 0"])
      s.add_development_dependency(%q<awesome_print>.freeze, [">= 0"])
      s.add_development_dependency(%q<nyaplot>.freeze, ["~> 0.1.5"])
      s.add_development_dependency(%q<nmatrix>.freeze, ["~> 0.2.1"])
      s.add_development_dependency(%q<distribution>.freeze, ["~> 0.7"])
      s.add_development_dependency(%q<gsl>.freeze, ["~> 2.1.0.2"])
      s.add_development_dependency(%q<dbd-sqlite3>.freeze, [">= 0"])
      s.add_development_dependency(%q<dbi>.freeze, [">= 0"])
      s.add_development_dependency(%q<activerecord>.freeze, ["~> 4.0"])
      s.add_development_dependency(%q<mechanize>.freeze, [">= 0"])
      s.add_development_dependency(%q<sqlite3>.freeze, ["~> 1.3.13"])
      s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.49.0"])
      s.add_development_dependency(%q<ruby-prof>.freeze, [">= 0"])
      s.add_development_dependency(%q<simplecov>.freeze, [">= 0"])
      s.add_development_dependency(%q<gruff>.freeze, [">= 0"])
      s.add_development_dependency(%q<webmock>.freeze, [">= 0"])
      s.add_development_dependency(%q<nokogiri>.freeze, [">= 0"])
      s.add_development_dependency(%q<guard-rspec>.freeze, [">= 0"])
    else
      s.add_dependency(%q<backports>.freeze, [">= 0"])
      s.add_dependency(%q<packable>.freeze, ["~> 1.3.9"])
      s.add_dependency(%q<spreadsheet>.freeze, ["~> 1.1.1"])
      s.add_dependency(%q<bundler>.freeze, [">= 1.10"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.5"])
      s.add_dependency(%q<pry>.freeze, ["~> 0.10"])
      s.add_dependency(%q<pry-byebug>.freeze, [">= 0"])
      s.add_dependency(%q<rserve-client>.freeze, ["~> 0.3"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.4"])
      s.add_dependency(%q<rspec-its>.freeze, [">= 0"])
      s.add_dependency(%q<awesome_print>.freeze, [">= 0"])
      s.add_dependency(%q<nyaplot>.freeze, ["~> 0.1.5"])
      s.add_dependency(%q<nmatrix>.freeze, ["~> 0.2.1"])
      s.add_dependency(%q<distribution>.freeze, ["~> 0.7"])
      s.add_dependency(%q<gsl>.freeze, ["~> 2.1.0.2"])
      s.add_dependency(%q<dbd-sqlite3>.freeze, [">= 0"])
      s.add_dependency(%q<dbi>.freeze, [">= 0"])
      s.add_dependency(%q<activerecord>.freeze, ["~> 4.0"])
      s.add_dependency(%q<mechanize>.freeze, [">= 0"])
      s.add_dependency(%q<sqlite3>.freeze, ["~> 1.3.13"])
      s.add_dependency(%q<rubocop>.freeze, ["~> 0.49.0"])
      s.add_dependency(%q<ruby-prof>.freeze, [">= 0"])
      s.add_dependency(%q<simplecov>.freeze, [">= 0"])
      s.add_dependency(%q<gruff>.freeze, [">= 0"])
      s.add_dependency(%q<webmock>.freeze, [">= 0"])
      s.add_dependency(%q<nokogiri>.freeze, [">= 0"])
      s.add_dependency(%q<guard-rspec>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<backports>.freeze, [">= 0"])
    s.add_dependency(%q<packable>.freeze, ["~> 1.3.9"])
    s.add_dependency(%q<spreadsheet>.freeze, ["~> 1.1.1"])
    s.add_dependency(%q<bundler>.freeze, [">= 1.10"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.5"])
    s.add_dependency(%q<pry>.freeze, ["~> 0.10"])
    s.add_dependency(%q<pry-byebug>.freeze, [">= 0"])
    s.add_dependency(%q<rserve-client>.freeze, ["~> 0.3"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.4"])
    s.add_dependency(%q<rspec-its>.freeze, [">= 0"])
    s.add_dependency(%q<awesome_print>.freeze, [">= 0"])
    s.add_dependency(%q<nyaplot>.freeze, ["~> 0.1.5"])
    s.add_dependency(%q<nmatrix>.freeze, ["~> 0.2.1"])
    s.add_dependency(%q<distribution>.freeze, ["~> 0.7"])
    s.add_dependency(%q<gsl>.freeze, ["~> 2.1.0.2"])
    s.add_dependency(%q<dbd-sqlite3>.freeze, [">= 0"])
    s.add_dependency(%q<dbi>.freeze, [">= 0"])
    s.add_dependency(%q<activerecord>.freeze, ["~> 4.0"])
    s.add_dependency(%q<mechanize>.freeze, [">= 0"])
    s.add_dependency(%q<sqlite3>.freeze, ["~> 1.3.13"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 0.49.0"])
    s.add_dependency(%q<ruby-prof>.freeze, [">= 0"])
    s.add_dependency(%q<simplecov>.freeze, [">= 0"])
    s.add_dependency(%q<gruff>.freeze, [">= 0"])
    s.add_dependency(%q<webmock>.freeze, [">= 0"])
    s.add_dependency(%q<nokogiri>.freeze, [">= 0"])
    s.add_dependency(%q<guard-rspec>.freeze, [">= 0"])
  end
end
