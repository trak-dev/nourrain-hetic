import { Nourrain } from "../models/nourrain.model";
import { QueryTypes } from "sequelize";

export default class Nourrain_Core {

  static async getByOwnerId(userId: number): Promise<Nourrain[] | undefined> {
    return Nourrain.sequelize?.query(
      `SELECT id, name, wallet FROM nourrain WHERE owner_id = :userId`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      });
  }

  static async getUserJoined(userId: number): Promise<Nourrain[] | undefined>  {
    return Nourrain.sequelize?.query(`
      SELECT n.id, n.name, n.wallet
      FROM nourrain n
      LEFT OUTER JOIN nourrains_users nu ON n.id = nu.nourrain_id
      WHERE nu.user_id = :userId AND n.owner_id != :userId
    `, {
      replacements: { userId },
      type: QueryTypes.SELECT
    });
  }

  static async getOneByUserId(nourrainId: number, userId: number): Promise<Nourrain[] | undefined> {
    return Nourrain.sequelize?.query(`
      SELECT n.id, n.description, n.name, n.wallet, n.owner_id
      FROM nourrain n
      LEFT OUTER JOIN nourrains_users nu ON n.id = nu.nourrain_id
      WHERE n.id = :nourrainId AND (nu.user_id = :userId OR n.owner_id = :userId)
    `, {
      replacements: { nourrainId, userId },
      type: QueryTypes.SELECT
    });
  }

  static async incrementOneById(nourrainId: number): Promise<void> {
    Nourrain.sequelize?.query(`
      UPDATE nourrain
      SET wallet = wallet + 1
      WHERE id = :nourrainId
    `, {
      replacements: { nourrainId },
      type: QueryTypes.SELECT
    });
  }

  static async createOne(name: string, description: string, userId: number, nourrainCode: string): Promise<void> {
    Nourrain.sequelize?.query(`
      INSERT INTO nourrain (name, description, owner_id, code)
      VALUES (:name, :description, :userId, :nourrainCode)
    `, {
      replacements: { name, description, userId, nourrainCode },
      type: QueryTypes.SELECT
    });
  }

  static async join(nourrainId: number, userId: number): Promise<void> {
    Nourrain.sequelize?.query(`
      INSERT INTO nourrains_users (nourrain_id, user_id, waiting)
      VALUES (:nourrainId, :userId, true)
    `, {
      replacements: { nourrainId, userId },
      type: QueryTypes.SELECT
    });
  }
}
