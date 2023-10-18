"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
class TransactionRepository {
    listAll(accountId, orderBy, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.transactions.findMany({
                where: {
                    OR: [
                        {
                            debitedAccountId: accountId,
                        },
                        {
                            creditedAccountId: accountId,
                        }
                    ],
                },
                orderBy: {
                    createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
                },
                take: total,
                include: {
                    creditedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                    debitedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                },
            });
            this.disconnect();
            return result;
        });
    }
    filterByDebited(accountId, orderBy, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.transactions.findMany({
                where: {
                    debitedAccountId: accountId,
                },
                orderBy: {
                    createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
                },
                take: total,
                include: {
                    creditedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                    debitedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                },
            });
            this.disconnect();
            return result;
        });
    }
    filterByCredited(accountId, orderBy, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.transactions.findMany({
                where: {
                    creditedAccountId: accountId,
                },
                orderBy: {
                    createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
                },
                take: total,
                include: {
                    creditedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                    debitedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                },
            });
            this.disconnect();
            return result;
        });
    }
    filterByRangeDate(accountId, begin, end, orderBy, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.transactions.findMany({
                where: {
                    OR: [
                        {
                            debitedAccountId: accountId,
                        },
                        {
                            creditedAccountId: accountId,
                        }
                    ],
                    createdAt: {
                        gte: begin,
                        lte: end,
                    },
                },
                orderBy: {
                    createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
                },
                take: total,
                include: {
                    creditedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                    debitedAccount: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        }
                    },
                },
            });
            this.disconnect();
            return result;
        });
    }
    disconnect() {
        client_1.default.$disconnect();
    }
}
exports.default = new TransactionRepository();
//# sourceMappingURL=transactionRepository.js.map