export var listCharts = {
    chart_info: {
        type: "line",
        controls: {},
        tags: [
            {localId:"getTemperaturaAireSalidaCompresor", initHiddenInChart:true},
            {localId:"getTemperaturaGasDeEscape", initHiddenInChart:true},
            {localId:"getvibracionchumacera_1", initHiddenInChart:true},
            {localId:"getrpm", initHiddenInChart:true},
            {localId:"getposicionigb", initHiddenInChart:true},
            {localId:"getTemperaturaDelAire", initHiddenInChart:true},
            {localId:"getNox", initHiddenInChart:true},

            {localId:"getGobernadoraizquierda", initHiddenInChart:true},
            {localId:"getGobernadoraderecha", initHiddenInChart:true},
            {localId:"getPresiondeentrada", initHiddenInChart:true},
            {localId:"getAltapresion", initHiddenInChart:true},
            {localId:"getbajapresion", initHiddenInChart:true},
            {localId:"getSalidadebajapresion", initHiddenInChart:true},
            {localId:"gettvRpm", initHiddenInChart:true},
            {localId:"getTemperaturaentradadeVaporBajaPreson", initHiddenInChart:true},
            {localId:"getTemperaturaentradaAltapresion", initHiddenInChart:true},
            {localId:"getTemperaturadevaporintermedia", initHiddenInChart:true},
            {localId:"getinterceptora", initHiddenInChart:true},
            {localId:"getValvuladecontrolbajapresion", initHiddenInChart:true},
            
            
        ]
    },
    chartontheturbine: {
        type: "line",
        controls: {},
        tags: [
            {localId:"getrpm", initHiddenInChart:false},
        ]
    }
};



export const lstTags = [];
lstTags["getTemperaturaAireSalidaCompresor"] = {
    label: "Temperatura de aire, salida del Compresor.",
    min: 0,
    max: 590,
    color: "#c5f327",
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgwSIAAAU0VSVklET1JfUElcRzFBMDgyODI",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgJyAAAAU0VSVklET1JfUElcRzJBMDgwODU",
            data: null,
            active: true,
            categoria:"ct2",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getTemperaturaGasDeEscape"] = {
    label: "Temperatura de gas de escape.",
    min: 0,
    max: 590,
    color: "#ffffff",
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgFyMAAAU0VSVklET1JfUElcRzFBMDg1MDc",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgriMAAAU0VSVklET1JfUElcRzJBMDg1MDc",
            data: null,
            active: true,
            categoria:"ct2",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getvibracionchumacera_1"] = {
    label: "Vibración chumacera 1",
    min: 0,
    max: 590,
    color: "rgba(255, 99, 132, 1)",
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Igzh8AAAU0VSVklET1JfUElcRzFBMDgxMzk",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgNSAAAAU0VSVklET1JfUElcRzJBMDgxMzk",
            data: null,
            active: true,
            categoria:"ct2",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getrpm"] = {
    label: "RPM.",
    min: 0,
    max: 590,
    color: 'rgba(255, 206, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ",
            data: null,
            active: true,
            categoria:"ct2",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getrt"] = {
    label: "RT.",
    min: 0,
    max: 590,
    color: 'rgba(255, 206, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc",
            data: null,
            active: true,
            categoria:"ct2",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getpotencia"] = {
    label: "RPM.",
    min: 0,
    max: 590,
    color: 'rgba(255, 206, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY",
            data: null,
            active: true,
            categoria:"ct2",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getposicionigb"] = {
    label: "Posición IGB.",
    min: 0,
    max: 590,
    color: 'rgba(255, 26, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig4CIAAAU0VSVklET1JfUElcRzFBMDg0MDc",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgdSMAAAU0VSVklET1JfUElcRzJBMDg0MDc",
            data: null,
            active: true,
            categoria:"ct2",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getTemperaturaDelAire"] = {
    label: "Temperatura del aire.",
    min: 0,
    max: 590,
    color: 'rgba(255, 104, 6, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgnB8AAAU0VSVklET1JfUElcRzFBMDgwMzI",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgBCAAAAU0VSVklET1JfUElcRzJBMDgwMzI",
            data: null,
            active: true,
            categoria:"ct2",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};

lstTags["getNox"] = {
    label: "Nox.",
    min: 0,
    max: 590,
    color: 'rgba(25, 206, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgyiIAAAU0VSVklET1JfUElcRzFBMDgyOTQ",
            data: null,
            active: true,
            categoria:"ct1",
        },
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgXyMAAAU0VSVklET1JfUElcRzJBMDgyOTQ",
            data: null,
            active: true,
            categoria:"ct2",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};


// TV
lstTags["getGobernadoraizquierda"] = {
    label: "Gobernadora izquierda.",
    min: 0,
    max: 590,
    color: 'rgba(250, 206, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig1R4AAAU0VSVklET1JfUElcRUhBMDgwMDI",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getGobernadoraderecha"] = {
    label: "Gobernadora derecha.",
    min: 0,
    max: 590,
    color: 'rgba(115, 206, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig1h4AAAU0VSVklET1JfUElcRUhBMDgwMDM",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getPresiondeentrada"] = {
    label: "Presión de entrada.",
    min: 0,
    max: 590,
    color: 'rgba(338, 20, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig4R4AAAU0VSVklET1JfUElcRUhBMDgwMTc",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getAltapresion"] = {
    label: "Alta presión",
    min: 0,
    max: 590,
    color: 'rgba(250, 26, 6, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig4x4AAAU0VSVklET1JfUElcRUhBMDgwMjA",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getbajapresion"] = {
    label: "Baja presión",
    min: 0,
    max: 590,
    color: 'rgba(285, 286, 6, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig5R4AAAU0VSVklET1JfUElcRUhBMDgwMjI",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getSalidadebajapresion"] = {
    label: "Salida de baja presión",
    min: 0,
    max: 590,
    color: 'rgba(245, 206, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgPh8AAAU0VSVklET1JfUElcRUhBMDgxNzM",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["gettvRpm"] = {
    label: "RPM",
    min: 0,
    max: 590,
    color: 'rgba(25, 206, 816, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getTemperaturaentradadeVaporBajaPreson"] = {
    label: "Temperatura de entrada de vapor de baja presión.",
    min: 0,
    max: 590,
    color: 'rgba(25, 26, 886, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgKh8AAAU0VSVklET1JfUElcRUhBMDgxNDU",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getTemperaturaentradaAltapresion"] = {
    label: "Temperatura de entrada de alta presión.",
    min: 0,
    max: 590,
    color: 'rgba(250, 176, 863, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgQR8AAAU0VSVklET1JfUElcRUhBMDgxNzc",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getTemperaturadevaporintermedia"] = {
    label: "Temperatura de vapor intermedia.",
    min: 0,
    max: 590,
    color: 'rgba(55, 20, 86, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Igqx4AAAU0VSVklET1JfUElcSDJBMDgwNDI",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getinterceptora"] = {
    label: "Interceptora.",
    min: 0,
    max: 590,
    color: 'rgba(255, 26, 816, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig1x4AAAU0VSVklET1JfUElcRUhBMDgwMDQ",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
lstTags["getValvuladecontrolbajapresion"] = {
    label: "Válvula de control de baja presión.",
    min: 0,
    max: 590,
    color: 'rgba(50, 255, 61, 1)',
    aguila: [
        {
            WebId: "P0uQAgHoBd0ku7P3cWOJL6Ig-x4AAAU0VSVklET1JfUElcRUhBMDgwNTY",
            data: null,
            active: true,
            categoria:"tv",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};