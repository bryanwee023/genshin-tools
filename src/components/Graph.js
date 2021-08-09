import { forwardRef } from "react";
import { Line } from "react-chartjs-2"

import { ORANGE } from "../utilities/colors"

const Graph = forwardRef((rollRates, ref) => {

    const xLabels = []
    for (let i = 1; i < 180; i++) {
        xLabels.push(i)
    }

    const data = (canvas) => {

        var fillGradient = canvas.getContext('2d').createLinearGradient(0, 400, 0, 0);

        fillGradient.addColorStop(1, ORANGE);
        fillGradient.addColorStop(0, "rgba(0,0,0,0)");

        return {
            labels: xLabels.slice(0, rollRates.data.length),
            datasets: [
            {
                label: "Banner 5*",
                data: rollRates.data,
                fill: true,
                backgroundColor: fillGradient,
                borderColor: ORANGE,
                tension: 0.6,
            },
            ],
        }
    };

    const options= {
        scales: {
            x: {
                display: false,
            },
            y: {
                ticks: { color: "#fefefe", stepSize: 0.2 },
                grid: { borderColor: "rgba(0,0,0,0)", color: "#707070"}
            }
        },
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: { labels: { color: "#fefefe", font: {family: "HYWeiHan"}} },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: (tooltipItems, _) => "Roll " + tooltipItems[0].parsed.x,
                    label: (tooltipItem, _) => " " + (tooltipItem.parsed.y * 100).toFixed(1) + "%",
                }
            }
        },
        maintainAspectRatio: false
    }

    return (
        <main className="Window" style={{marginTop: "auto", marginBottom: "auto"}}>
            <Line data={data} options={options} ref={ref} style={{verticalAlign: "middle"}} />
            
        </main>
    )
})

export default Graph;