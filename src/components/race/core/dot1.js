export const dot = {
    sprite: null,
    track: null,
    offset: 25,
    startPoint: 0.9,

    // Initialize the dot: connect sprite and track properties with supplied SVG elements
    init: function(sprite, track) {
        this.sprite = document.getElementById(sprite);
        this.track = document.getElementById(track);
    },
    
    // Put the dot on its spot
    move: function(u) {
        const lenght = this.track.getTotalLength();
        const current = u + this.startPoint;

        let point = 0;
        if (current > 1) {
            point = u - (1 - this.startPoint);
        } else {
            point = current;
        }

        const p = this.track.getPointAtLength(lenght - point * lenght);
        this.sprite.setAttribute("transform", `translate(${p.x - this.offset}, ${p.y - this.offset}) scale(0.8)`);
    }
};
