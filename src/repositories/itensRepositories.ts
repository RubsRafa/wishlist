import prisma from "../database/db";
import { AddItemType, DataParams } from "../protocols/itensProtocols";

async function listAllItens() {
  let data: DataParams[];
  await prisma.itens.findMany({
    include: {
      itens_genres: {
        select: {
          genres: {
            select: {
              genre: true,
            },
          },
        },
      },
      itens_platforms: {
        select: {
          platforms: {
            select: {
              name: true,
            }
          }
        }
      },
      itens_status: {
        select: {
          status: {
            select: {
              status: true
            }
          },
        },
      },
    }
  })
  .then((res) => {
    data = res.map((i) => {
      return {
        id: i.id,
        name: i.name,
        genre: i.itens_genres[0].genres.genre,
        platform: i.itens_platforms[0].platforms.name,
        status: i.itens_status[0].status.status
      }
    })
    return data;
  })
  return data;

}

async function postItem({ name }: AddItemType) {
  return prisma.itens.create({
    data: {
      name
    }
  })
}

async function findItemByName({ name }: AddItemType) {
  return prisma.itens.findUnique({
    where: {
      name
    }
  })
}

async function addItemInfo({ id, genre, platform, status }: AddItemType) {
  const id_item = Number(id)
  
  console.log('vai add info do item', id_item, typeof(id_item), genre, typeof(genre), platform, typeof(platform), status, typeof(status))
  await prisma.itens_genres.create({
    data:{
      id_item, id_genre: genre
    }
  });
  
  await prisma.itens_platforms.create({
    data:{
      id_item, id_platform: platform
    }
  });
  
  await prisma.itens_status.create({
    data:{
      id_item, id_status: status
    }
  });

  return 'sair do add info';
}

async function findItem({ id }: AddItemType) {
  let data: DataParams;
  const id_item = Number(id);
  return prisma.itens.findFirst({
    where: {
      id: id_item,
    },
    include: {
      itens_genres: {
        select: {
          genres: {
            select: {
              genre: true,
            },
          },
        },
      },
      itens_platforms: {
        select: {
          platforms: {
            select: {
              name: true,
            }
          }
        }
      },
      itens_status: {
        select: {
          status: {
            select: {
              status: true
            }
          },
        },
      },
    }
  })
  .then((res) => {
    data = {
        id: res.id,
        name: res.name,
        genre: res.itens_genres[0].genres.genre,
        platform: res.itens_platforms[0].platforms.name,
        status: res.itens_status[0].status.status
      }

    return data;
  });
}

async function updateItem({ id, status }: AddItemType) {
  const id_item = Number(id);
  return prisma.itens_status.update({
    where: {
    id_item
    },
    data: {
      id_status: status,
    }
  })
}

async function deleteItem ({ id }: AddItemType) {
  const id_item = Number(id)
  return prisma.itens.delete({
    where: {
      id: id_item
    }
  })
}

export default {
  listAllItens,
  postItem,
  addItemInfo,
  findItem,
  findItemByName,
  updateItem,
  deleteItem
}