export var listCharts = {
    chart_info: {
        type: "line",
        controls: {},
        tags: [
            {localId:"getTemperaturaAireSalidaCompresor", initHiddenInChart:false}
        ]
    }
};

export const lstTags = [];
lstTags["getTemperaturaAireSalidaCompresor"] = {
    label: "Temperatura Aire Salida Compresor",
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
            WebId: "P0uQAgHoBd0ku7P3cWOJL6IgwSIAAAU0VSVklET1JfUElcRzFBMDgyODI",
            data: null,
            active: true,
            categoria:"ct2",
        }
    ],
    sol: [{ WebId: null, data: null, active: false }],
    overview: [{ value: null, timestamp: null }]
};
