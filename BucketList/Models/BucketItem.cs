namespace BucketList.Models
{
    public class BucketItem
    {
        public long id {get; set;}
        public string? name {get; set;}
        public bool isComplete {get; set;}

        public BucketItem(long id, string? name, bool isComplete)
        {
            this.id = id;
            this.name = name;
            this.isComplete = isComplete;
        }
    }
}