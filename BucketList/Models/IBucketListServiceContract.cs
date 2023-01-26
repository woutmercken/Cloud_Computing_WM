using System.ServiceModel;
using BucketList.Models;
namespace Models
{
    [ServiceContract]
    
    public interface IBucketListServiceContract{

        [OperationContract]
        void addItem(long id, string name, bool isComplete);

        [OperationContract]
        List<BucketItem> getAllItems();

        [OperationContract]
        BucketItem getItem(long id);
    }
}