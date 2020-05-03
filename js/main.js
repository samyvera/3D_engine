window.onload = () => {
    const keys = new KeyboardListener().keys;
    const game = new Game(DATA2);
    const view = new View();

    const frame = () => {
        game.update(keys);
        if (keys.a) view.renderTopDown(game);
        else view.renderFirstPerson(game);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}
