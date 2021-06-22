import { Router, static as st } from "express";
import createHttpError from "http-errors";
import {
  FileUploadFolderStaticServe,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../utils";
import UserFavoriteController from "./add-to-favourites.controller";
import AuthController from "./auth.controller";
import FileUploaderController from "./file-uploader.controller";
import JustJoinersController from "./just-joinee.controller";
import MutualMatchController from "./mutualConnection.controller";
import NotificationController from "./notification.controller";
import ProfileRecommendationController from "./profile-recommendation.controller";
import RequestController from "./request-controller";
import CreateProfileController from "./update-profile.controller";
import UserBasicDetailController from "./user-detail.controller";
import UserController from "./users.controller";

const router = Router();

router.use(
  st(FileUploadFolderStaticServe, {
    cacheControl: true,
    immutable: true,
    fallthrough: true,
  })
);

router.get(
  "/data",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      res.status(200).send({
        ...SUCCESS,
        msg: "server is running",
        ip: req.ip,
        timestamp: Date.now(),
      });
    } catch (error) {
      next(new createHttpError.InternalServerError(`Something went bad!`));
    }
    next();
  }
);

// Controllers
router.use("/auth", AuthController);
router.use("/profile", CreateProfileController);
router.use("/user", UserBasicDetailController);
router.use("/profiles-recommendations", ProfileRecommendationController);
router.use("/users", UserController);
router.use("/just-joiners", JustJoinersController);
router.use("/request", RequestController);
router.use("/mutual-matches", MutualMatchController);
router.use("/upload-service", FileUploaderController);
router.use("/user/favorites/0", UserFavoriteController);
router.use("/notifications", NotificationController);

export default router;
