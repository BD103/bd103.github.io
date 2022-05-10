{ pkgs }: {
    deps = [
        pkgs.ruby
        pkgs.bundler

        pkgs.nodePackages.prettier

        pkgs.vim
    ];
}
