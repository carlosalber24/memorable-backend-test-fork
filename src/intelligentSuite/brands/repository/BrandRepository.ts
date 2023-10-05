import {Service} from "typedi";
import {Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import {BaseRepository} from "../../../common/repositories/BaseRepository";
import Brand from "../entities/Brand";
import {BrandQuerySet} from "./BrandQuerySet";

@Service()
export class BrandRepository extends BaseRepository<Brand> {
    constructor(@InjectRepository(Brand) private repository: Repository<Brand>) {
        super(repository);
    }

    async updateBrandAssets(brand: Brand, adAccountsIds: number[], socialAccountsIds: number[]) {
        if (adAccountsIds.length > 0) {
            brand.adAccounts = adAccountsIds.map((id) => {
                return id.toString();
            });
        }
        if (socialAccountsIds.length == 0) {
            brand.socialAccounts = socialAccountsIds.map((id) => {
                return id.toString();
            });
        }

        await this.save(brand);
    }

    getQuerySet(): BrandQuerySet<Brand> {
        const queryBuilder = this.repository.createQueryBuilder("Brand");
        return new BrandQuerySet(queryBuilder, "Brand");
    }
}
