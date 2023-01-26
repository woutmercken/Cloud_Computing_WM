/**using BucketList.Controllers;
using BucketList.Models;
using Microsoft.EntityFrameworkCore;
namespace Models{
    
    public class IBucketListServiceImpl: IBucketListServiceContract{

        public async void addItem(long id, string name, bool isComplete){
            await BucketItemsController.PostBucketItem(new BucketItem(id, name, isComplete));
        }
    }
}**/