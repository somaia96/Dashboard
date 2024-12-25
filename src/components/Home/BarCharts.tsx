import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import { datasetDecision, datasetEvent, datasetNews, datasetServices,chartConfig } from "./DataCharts"


export function Chart() {
  return (
    <div className="flex flex-wrap gap-y-5 mt-2 justify-around">
    <ChartContainer config={chartConfig} className="w-1/2 h-80 max-w-[420px]">
      <BarChart accessibilityLayer data={datasetDecision}>
        <CartesianGrid vertical={false} /> 
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="decision" fill="var(--color-decision)" radius={4} />
      </BarChart>
    </ChartContainer>

    <ChartContainer config={chartConfig} className="w-1/2 h-80 max-w-[420px]">
      <BarChart accessibilityLayer data={datasetEvent}>
        <CartesianGrid vertical={false} /> 
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="event" fill="var(--color-event)" radius={4} />
      </BarChart>
    </ChartContainer>

    <ChartContainer config={chartConfig} className="w-1/2 h-80 max-w-[420px]">
      <BarChart accessibilityLayer data={datasetNews}>
        <CartesianGrid vertical={false} /> 
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="news" fill="var(--color-news)" radius={4} />
      </BarChart>
    </ChartContainer>

    <ChartContainer config={chartConfig} className="w-1/2 h-80 max-w-[420px]">
      <BarChart accessibilityLayer data={datasetServices}>
        <CartesianGrid vertical={false} /> 
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="services" fill="var(--color-services)" radius={4} />
      </BarChart>
    </ChartContainer>
    </div>

  )
}
