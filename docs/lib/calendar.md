# Calendar

Create a timer

nix = calendar.timeout(10000,
    io.out.writeLine('bang!');
);

nix();