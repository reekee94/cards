import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { GetEmployeeDonationReward } from '../impl/get-employee-donation-reward.query';

@QueryHandler(GetEmployeeDonationReward)
export class GetEmployeeDonationRewardQueryHandler
  implements IQueryHandler<GetEmployeeDonationReward>
{
  constructor(
    private readonly _ds: DataSource,
  ) {}
  async execute(query: GetEmployeeDonationReward) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const result = await qr.manager.query(
        `
        WITH DonationSummary AS (
          SELECT 
              d."employeeId",
              SUM(d."amountInUSD") AS total_donation
          FROM 
              donation d
          GROUP BY 
              d."employeeId"
          HAVING 
              SUM(d."amountInUSD") > 100
      ),
      
      TotalDonations AS (
          SELECT SUM(total_donation) AS total_donations
          FROM DonationSummary
      ),
      
      Rewards AS (
          SELECT 
              ds."employeeId",
              ds.total_donation,
              ROUND((ds.total_donation / td.total_donations) * 10000, 2) AS reward
          FROM DonationSummary ds, TotalDonations td
      )
      
      SELECT 
          e.id,
          e.name,
          e.surname,
          r.reward
      FROM 
          employee e
          JOIN Rewards r ON e.id = r."employeeId"
      ORDER BY 
          e.id;      
        `
      );
        return result;
      });
      // const viewCards = cards.map((card) => DefaultCardDto.fromEntity(card));
      // return viewCards;
  }
}

