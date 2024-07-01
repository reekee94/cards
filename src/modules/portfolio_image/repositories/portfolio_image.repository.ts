import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, QueryRunner, Repository } from 'typeorm';
import { PortfolioImage } from '../entities/portfolio_image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/modules/portfolio/entities/portfolio.entity';

Injectable()
export class PortfolioImageRepository {
  constructor(
    @InjectRepository(PortfolioImage)
    private readonly repo: Repository<PortfolioImage>,
  ) {}

  async create(file: Buffer, imageName: string, imageDescription: string, portfolioId: number, qr: QueryRunner) {
    const imageRepo = this._getRepository(qr);

    const newImage = imageRepo.create({
        data: file,
        image_name: imageName,
        image_description: imageDescription,
        portfolioId
    });

    
    return await imageRepo.save(newImage);
  }

  async update(image: PortfolioImage, qr: QueryRunner) {
    return this._getRepository(qr).save(image);
  }

  async delete(image: PortfolioImage, qr: QueryRunner) {
    return await qr.manager.remove(image);
  }


  async findAll(qr?: QueryRunner) {
    const repository = qr ? qr.manager.getRepository(PortfolioImage) : this.repo;
    return await repository.find({ relations: ['portfolio', 'comments'] });
  }

  async findOneById(id: number, qr?: QueryRunner) {
    const repository = qr ? qr.manager.getRepository(PortfolioImage) : this.repo;
    return await repository.findOne({ where: { id }, relations: ['portfolio', 'comments'] });
  }

  async findAndCount(options: FindManyOptions<PortfolioImage>, qr: QueryRunner) {
    const imageRepo = this._getRepository(qr);

    console.log(options, '333333333333')

    return await imageRepo.findAndCount(options);
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(PortfolioImage);
  }
}