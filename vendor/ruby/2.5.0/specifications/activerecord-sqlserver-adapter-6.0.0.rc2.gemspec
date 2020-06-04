# -*- encoding: utf-8 -*-
# stub: activerecord-sqlserver-adapter 6.0.0.rc2 ruby lib

Gem::Specification.new do |s|
  s.name = "activerecord-sqlserver-adapter".freeze
  s.version = "6.0.0.rc2"

  s.required_rubygems_version = Gem::Requirement.new("> 1.3.1".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/rails-sqlserver/activerecord-sqlserver-adapter/issues", "changelog_uri" => "https://github.com/rails-sqlserver/activerecord-sqlserver-adapter/blob/v6.0.0.rc2/CHANGELOG.md", "source_code_uri" => "https://github.com/rails-sqlserver/activerecord-sqlserver-adapter/tree/v6.0.0.rc2" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ken Collins".freeze, "Anna Carey".freeze, "Will Bond".freeze, "Murray Steele".freeze, "Shawn Balestracci".freeze, "Joe Rafaniello".freeze, "Tom Ward".freeze]
  s.date = "2020-05-19"
  s.description = "ActiveRecord SQL Server Adapter. SQL Server 2012 and upward.".freeze
  s.email = ["ken@metaskills.net".freeze, "will@wbond.net".freeze]
  s.homepage = "http://github.com/rails-sqlserver/activerecord-sqlserver-adapter".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.5.0".freeze)
  s.rubygems_version = "2.7.6".freeze
  s.summary = "ActiveRecord SQL Server Adapter.".freeze

  s.installed_by_version = "2.7.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activerecord>.freeze, ["~> 6.0.0"])
      s.add_runtime_dependency(%q<tiny_tds>.freeze, [">= 0"])
    else
      s.add_dependency(%q<activerecord>.freeze, ["~> 6.0.0"])
      s.add_dependency(%q<tiny_tds>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<activerecord>.freeze, ["~> 6.0.0"])
    s.add_dependency(%q<tiny_tds>.freeze, [">= 0"])
  end
end
