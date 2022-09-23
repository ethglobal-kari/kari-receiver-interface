import dayjs from "dayjs";
import { randomInt } from "src/utils/numberUtils";

import type { TableData } from "./CampaignTable";

export const mockOnGoingCampaigns: TableData[] = [
  {
    subject: "New Campaign",
    audience: "Defi User who ..",
    read: 0,
    click: 0,
    prizePool: 2000,
    claimed: 0,
    totalAmount: 100,
    timestamp: dayjs().add(0, "day").toISOString(),
  },
  {
    subject: "ETH APR boost",
    audience: "Defi User who ..",
    read: 5000,
    click: 2453,
    prizePool: 2000,
    claimed: 80,
    totalAmount: 100,
    timestamp: dayjs().add(-1, "day").toISOString(),
  },
  {
    subject: "New Pool launch",
    audience: "Defi User who ..",
    read: 4853,
    click: 3625,
    prizePool: 2000,
    claimed: 97,
    totalAmount: 100,
    timestamp: dayjs().add(-2, "day").toISOString(),
  },
];

export const mockRecentCampaigns: TableData[] = Array.from({ length: 8 }).map((_, idx) => {
  return {
    subject: "Campaign",
    audience: "Defi User",
    read: 5000,
    click: 5000,
    prizePool: 2000,
    claimed: randomInt(90, 100),
    totalAmount: 100,
    timestamp: dayjs()
      .add(-3 - idx, "day")
      .toISOString(),
  };
});
