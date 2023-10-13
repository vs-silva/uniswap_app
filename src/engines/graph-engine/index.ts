import Chart, {ChartType, ChartTypeRegistry, DefaultDataPoint} from 'chart.js/auto';
import type {GraphEngineDriverPorts} from "./graph-engine-driver.ports.ts";
import type {GraphEngineDataDTO} from "./graph-engine-data.dto.ts";

export function GraphEngine(): GraphEngineDriverPorts {

    let engine: Chart<ChartType,DefaultDataPoint<ChartType>,unknown> | null = null;

    function generateGraph(canvas: HTMLCanvasElement, graphType: string, graphData: GraphEngineDataDTO): void {

        if(engine) {
            engine.destroy();
        }

        engine = new Chart(canvas, {
            type: graphType as keyof ChartTypeRegistry,
            data: graphData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateGraph(graphData: GraphEngineDataDTO): void {

        console.log(engine);

        if(!engine || !engine.canvas) {
            return;
        }

        engine.data = graphData;
        engine.update();
    }

    return {
        generateGraph,
        updateGraph
    };
}
