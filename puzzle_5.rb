f = File.new('texts/puzzle_5.txt').readlines.map { |line| line.gsub("\n", '') }

seed_keys = f[0][7..].split(' ').map(&:to_i)

new_seed_keys = []
idx = 0
while idx + 2 <= seed_keys.size
  start, range = seed_keys[idx, 2]
  new_seed_keys << [start, start + range]
  idx += 2
end



source_arr_to_diff_hsh = Hash.new
f[2..].each do |line|
  if /-to-/.match?(line)
    source_arr_to_diff_hsh = Hash.new
  elsif line == ''
    idx = 0
    while idx < new_seed_keys.size
      seed_start, seed_end = new_seed_keys[idx]

      source_arr_to_diff_hsh.each do |source_start_and_end_arr, difference|
        source_start, source_end = source_start_and_end_arr

        # Determine if seed is coming from left
        if seed_start < source_start && seed_end > source_start && seed_end >= source_start
          new_seed_start = seed_start
          new_seed_end = source_start
          new_seed_keys << [new_seed_start, new_seed_end]

          seed_start = source_start
        end

        # Determine if seed is moving beyond to the right
        if seed_start >= source_start && seed_end > source_end && seed_start < source_end
          new_seed_start = source_end
          new_seed_end = seed_end
          new_seed_keys << [new_seed_start, new_seed_end]

          seed_end = source_end
        end
        
        # If the seed can fit entirely into the source array
        if seed_start >= source_start && seed_end <= source_end
          new_seed_keys[idx] = [seed_start + difference, seed_end + difference]
        end

        new_seed_keys
      end
      
      idx += 1
    end
  else
    mapped_to, source_start, range = line.split(' ').map(&:to_i)
    source_arr_to_diff_hsh[[source_start, source_start + range]] = mapped_to - source_start
  end
end

idx = 0
while idx < new_seed_keys.size
  seed_start, seed_end = new_seed_keys[idx]

  source_arr_to_diff_hsh.each do |source_start_and_end_arr, difference|
    source_start, source_end = source_start_and_end_arr

    # Determine if seed is coming from left
    if seed_start < source_start && seed_end > source_start && seed_end >= source_start
      new_seed_start = seed_start
      new_seed_end = source_start
      new_seed_keys << [new_seed_start, new_seed_end]

      seed_start = source_start
    end

    # Determine if seed is moving beyond to the right
    if seed_start >= source_start && seed_end > source_end && seed_start < source_end
      new_seed_start = source_end
      new_seed_end = seed_end
      new_seed_keys << [new_seed_start, new_seed_end]

      seed_end = source_end
    end
    
    # If the seed can fit entirely into the source array
    if seed_start >= source_start && seed_end <= source_end
      new_seed_keys[idx] = [seed_start + difference, seed_end + difference]
    end

    new_seed_keys
  end
  
  idx += 1
end

puts new_seed_keys.sort_by { |arr| arr[0] }[0][0]

# f = File.new('texts/puzzle_5.txt').readlines.map { |line| line.gsub("\n", '') }

# seed_keys = f[0][7..].split(' ').map(&:to_i)

# source_arr_to_diff_hsh = Hash.new
# f[2..].each do |line|
#   p source_arr_to_diff_hsh
#   if /-to-/.match?(line)
#     source_arr_to_diff_hsh = Hash.new
#   elsif line == ''
#     seed_keys.map! do |seed|
#       transformed_seed = seed
#       source_arr_to_diff_hsh.each do |source_start_and_range_arr, difference|
#         source_start, range = source_start_and_range_arr

#         if source_start <= seed && source_start + range > seed
#           transformed_seed = seed + difference
#         end
#       end

#       transformed_seed
#     end
#   else
#     destination_start, source_start, range = line.split(' ').map(&:to_i)
#     source_arr_to_diff_hsh[[source_start, range]] = destination_start - source_start
#   end
# end

# seed_keys.map! do |seed|
#   transformed_seed = seed
#   source_arr_to_diff_hsh.each do |source_start_and_range_arr, difference|
#     source_start, range = source_start_and_range_arr

#     if source_start <= seed && source_start + range > seed
#       transformed_seed = seed + difference
#     end
#   end

#   transformed_seed
# end

# puts seed_keys.min
