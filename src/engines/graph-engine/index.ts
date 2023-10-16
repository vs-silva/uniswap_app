import Chart, {ChartType, ChartTypeRegistry, DefaultDataPoint, registerables} from 'chart.js/auto';
import type {GraphEngineDriverPorts} from "./graph-engine-driver.ports.ts";
import type {GraphEngineDataDTO} from "./graph-engine-data.dto.ts";

export function GraphEngine(): GraphEngineDriverPorts {

    Chart.register(...registerables);
    let graphInstance: Chart<ChartType,DefaultDataPoint<ChartType>,unknown> | null = null;

    function generateGraph(canvas: HTMLCanvasElement, graphType: string, graphData: GraphEngineDataDTO): void {

        if(graphInstance) {
            graphInstance.destroy();
        }

        graphInstance =  new Chart(canvas, {
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

        if(!graphInstance || !graphInstance.canvas) {
            return;
        }

        graphInstance.data = graphData;
        graphInstance.update();
    }

    return {
        generateGraph,
        updateGraph
    };
}
